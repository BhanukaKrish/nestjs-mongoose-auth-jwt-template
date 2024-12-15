import { BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';

export const mongoDbIdValidation = async (id: string) => {
  if (!mongoose.isValidObjectId(id)) {
    throw new BadRequestException('Please enter a valid id');
  }
};
