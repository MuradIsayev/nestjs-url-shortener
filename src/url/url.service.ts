import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { Url } from './entities/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(@InjectRepository(Url) private urlRepository: Repository<Url>) {}
  async shortenUrl(shortenUrlDto: ShortenUrlDto) {
    const url = await this.urlRepository.findOneBy({
      longUrl: shortenUrlDto.longUrl,
    });

    if (url) throw new BadRequestException('Url already exists');

    const urlKey: string = nanoid(5);
    const baseUrl = 'http://localhost:3000';
    const shortUrl = `${baseUrl}/${urlKey}`;

    try {
      const url = this.urlRepository.create({
        urlKey,
        longUrl: shortenUrlDto.longUrl,
        shortUrl,
      });
      await this.urlRepository.save(url);

      return shortUrl;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async redirect(urlKey: string) {
    const url = await this.urlRepository.findOneBy({
      urlKey,
    });

    if (!url) throw new BadRequestException('Url does not exist');

    return url.longUrl;
  }
}
