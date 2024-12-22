export const mapBaseEventToDto = (event: any) => ({
  id: event.id,
  title: event.title,
  startAt: event.startAt.toISOString(),
  endAt: event.endAt.toISOString(),
  location: event.location,
});

export const mapDtoToBaseEvent = (dto: any) => ({
  id: dto.id,
  title: dto.title,
  startAt: new Date(dto.startAt),
  endAt: new Date(dto.endAt),
  location: dto.location,
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
});
