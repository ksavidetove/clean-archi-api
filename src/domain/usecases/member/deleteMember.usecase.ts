import { Inject } from '@nestjs/common';
import { DeleteMemberDto } from 'application/dto';
import { SYMBOLS } from 'shared/symbols';
import { IMemberRepository } from 'domain/repositories';

export class DeleteMemberUseCase {
  constructor(
    @Inject(SYMBOLS.MemberRepository)
    private readonly memberRepository: IMemberRepository,
  ) {}

  async execute(deleteMemberDto: DeleteMemberDto): Promise<boolean> {
    return this.memberRepository.delete(deleteMemberDto.id);
  }
}
