import { Controller, Get, Post, Param, Res, Body } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { Response } from 'express';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  create(@Body() shortenUrlDto: ShortenUrlDto) {
    return this.urlService.shortenUrl(shortenUrlDto);
  }

  @Get(':urlKey')
  async redirect(@Param('urlKey') urlKey: string, @Res() res: Response) {
    const longUrl = await this.urlService.redirect(urlKey);

    res.redirect(longUrl);
    res.end();
  }
}
