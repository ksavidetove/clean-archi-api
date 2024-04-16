import { Inject } from '@nestjs/common';
import { FindMemberByIdDto, MemberDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { IMemberRepository } from 'domain/repositories';
import { MemberNotFoundError } from 'shared/expetions';

export class FindMemberByIdUseCase {
  constructor(
    @Inject(SYMBOLS.MemberRepository)
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(findMemberDto: FindMemberByIdDto): Promise<MemberDto> {
    const member = await this.memberRepository.findOneById(findMemberDto.id);

    if (!member) {
      throw new MemberNotFoundError([findMemberDto.id]);
    }

    return MemberDto.fromEntity(member);
  }
}
