import {
  getModelForClass,
  prop
} from '@typegoose/typegoose';

class HighScore {
  @prop({ required: true })
  public username: string;

  @prop({ required: true, min: 0, max: 99999 })
  public score: number;
}

const HighScoreModel = getModelForClass(HighScore);

export default HighScoreModel;