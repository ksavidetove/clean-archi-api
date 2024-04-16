import { Inject } from '@nestjs/common';
import { CreateMemberDto, MemberDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { IMemberRepository } from 'domain/repositories';

export class CreateMemberUseCase {
  constructor(
    @Inject(SYMBOLS.MemberRepository)
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(createMemberDto: CreateMemberDto): Promise<MemberDto> {
    const member = await this.memberRepository.create(createMemberDto.name);
    return MemberDto.fromEntity(member);
  }
}
