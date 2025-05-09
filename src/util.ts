import {ClassTransformOptions, plainToInstance} from "class-transformer";
import {ObjectLiteral, Repository} from "typeorm";
import {NotFoundException} from "@nestjs/common";

export function transformToDto<T, V>(
    cls: new () => T,
    plain: V,
    options: ClassTransformOptions = {}
) {
    return plainToInstance(cls, plain, {
        excludeExtraneousValues: true,
        ...options,
    })
}

export async function findOrFail<T extends ObjectLiteral>(repo: Repository<T>, id: string, name: string): Promise<T> {
    const entity = await repo.findOneBy({ id } as any);
    if (!entity) throw new NotFoundException(`${name} not found`);
return entity;
}