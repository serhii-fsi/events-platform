import {
  DetailedEventResponseDto,
  DetailedEventDto,
  BaseEventDto,
} from '@/dto';
import {
  UserEntity,
  BaseEventEntity,
  DetailedEventEntity,
} from '@/domain/types';

export const mapDtoToBaseEvent = (dto: BaseEventDto): BaseEventEntity => ({
  id: dto.id,
  title: dto.title,
  startAt: new Date(dto.startAt),
  endAt: new Date(dto.endAt),
  location: dto.location,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});

export const mapDtoToDetailedEvent = (
  dto: DetailedEventDto
): DetailedEventEntity => ({
  ...mapDtoToBaseEvent(dto),
  description: dto.description,
});
