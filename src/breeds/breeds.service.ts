import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {

  constructor(

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) { }

  async create(createBreedDto: CreateBreedDto) {
    return await this.breedRepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: number) {
    const breed = await this.breedRepository.findOneBy({ id });
    if (!breed) {
      throw new BadRequestException(`Breed with id ${id} not found`);
    }
    return breed;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    await this.findOne(id);
    return await this.breedRepository.update(id, updateBreedDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.breedRepository.delete(id);
  }
}
