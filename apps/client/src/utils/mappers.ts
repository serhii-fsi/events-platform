import {
  DetailedEventResponseDto,
  DetailedEventDto,
  BaseEventDto,
} from '@/dto';
import {
  UserEntity,
  BaseEventEntity,
  DetailedEventEntity,
  Optional,
} from '@/domain/types';

export const mapDtoToBaseEvent = (
  dto: Optional<BaseEventDto, 'id' | 'createdAt' | 'updatedAt'>
): BaseEventEntity => ({
  ...(dto.id && { id: dto.id }),
  title: dto.title,
  startAt: new Date(dto.startAt),
  endAt: new Date(dto.endAt),
  location: dto.location,
  ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
  ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
});

export const mapDtoToDetailedEvent = (
  dto: Optional<DetailedEventDto, 'id' | 'createdAt' | 'updatedAt'>
): DetailedEventEntity => ({
  ...mapDtoToBaseEvent(dto),
  description: dto.description,
});

export const mapBaseEventToDto = (
  entity: BaseEventEntity
): Optional<BaseEventDto, 'id' | 'createdAt' | 'updatedAt'> => ({
  ...(entity.id && { id: entity.id }),
  title: entity.title,
  startAt: entity.startAt.toISOString(),
  endAt: entity.endAt.toISOString(),
  location: entity.location,
  ...(entity.createdAt && { createdAt: entity.createdAt.toISOString() }),
  ...(entity.updatedAt && { updatedAt: entity.updatedAt.toISOString() }),
});

export const mapDetailedEventToDto = (
  entity: DetailedEventEntity
): Optional<DetailedEventDto, 'id' | 'createdAt' | 'updatedAt'> => ({
  ...mapBaseEventToDto(entity),
  description: entity.description,
});
