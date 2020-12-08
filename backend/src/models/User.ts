import 
{
  DocumentType,
  getModelForClass,
  pre,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IJWTToken {
  _id: Schema.Types.ObjectId;
}

@pre<User>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
})

class User {
  _id: Schema.Types.ObjectId;

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
      throw new Error('Invalid JWT Key.');
    }

    const tokenSigner: IJWTToken = {
      _id: user._id,
    };
  
    const token = jwt.sign(tokenSigner, JWT_KEY);
  
    user.token = token;
  
    await user.save();
  
    return token;
  }

  public static async findByCredentials (
    this: ReturnModelType<typeof User>,
    username: string,
    password: string
  ) {
    const user = await this.findOne({ username });
  
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