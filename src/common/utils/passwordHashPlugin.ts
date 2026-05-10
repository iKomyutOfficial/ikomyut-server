import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export function PasswordHashPlugin(schema: Schema) {
  schema.pre('save', async function (next) {
    const doc = this as any;

    if (!doc.password || !doc.isModified('password')) {
      return next();
    }

    try {
      doc.password = await bcrypt.hash(doc.password, 10);
      next();
    } catch (err) {
      next(err as any);
    }
  });
}
