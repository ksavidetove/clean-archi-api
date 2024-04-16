import { Inject } from '@nestjs/common';
import { MemberDto, UpdateMemberNameDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { IMemberRepository } from 'domain/repositories';
import { MemberNotFoundError } from 'shared/expetions';

export class UpdateMemberNameUseCase {
  constructor(
    @Inject(SYMBOLS.MemberRepository)
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(updateMemberDto: UpdateMemberNameDto): Promise<MemberDto> {
    const memberExists = await this.memberRepository.exists(updateMemberDto.id);

    if (!memberExists) {
      throw new MemberNotFoundError([updateMemberDto.id]);
    }

    const updatedMember = await this.memberRepository.update(
      updateMemberDto.id,
      { name: updateMemberDto.name },
    );
    return MemberDto.fromEntity(updatedMember);
  }
}
