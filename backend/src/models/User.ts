import {
  DocumentType,
  getModelForClass,
  pre,
  prop,
  ReturnModelType
} from '@typegoose/typegoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

@pre<User>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
})

class User {
  @prop()
  public _id: string;

  @prop({ required: true, unique: true, trim: true })
  public username: string;
  
  @prop({
    required: true,
    unique: true,
    lowercase: true,
    validate: (value: string): any => {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email address');
      }
    },
  })
  public email: string;

  @prop({
    required: true,
    minlength: 7,
  })
  public password: string;

  @prop()
  public token: string;

  public async generateAuthToken(this: DocumentType<User>) {
    const user = this;
    const { JWT_KEY } = process.env;
  
    if (!JWT_KEY) {
      return null;
    }
  
    const token = jwt.sign({ _id: user._id }, JWT_KEY);
  
    user.token = token;
  
    await user.save();
  
    return token;
  }

  public static async findByCredentials (
    this: ReturnModelType<typeof User>,
    email: string,
    password: string
  ) {
    const user = await this.findOne({ email });
  
    if (!user) {
      throw new Error('Invalid login credentials');
    };
  
    const passwordMatches = await bcrypt.compare(password, user.password);
  
    if (!passwordMatches) {
      throw new Error('Invalid login credentials');
    }
  
    return user;
  }
}

const UserModel = getModelForClass(User);

export default UserModel;