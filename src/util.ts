import {ClassTransformOptions, plainToInstance} from "class-transformer";

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