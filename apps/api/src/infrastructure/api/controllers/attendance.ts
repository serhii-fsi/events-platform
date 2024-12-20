import { Request, Response, NextFunction } from 'express';
import {
  AttendanceStatusResponseDto,
  AttendanceStatusPathDto,
  AttendanceStatusDto,
  UserIdPath,
  EventIdPath,
} from '../types/dto';
import { attendanceService } from '../../../domain/services/attendance';
import { Attendance } from '../../../domain/types';

const mapAttendanceToDto = (attendance: Attendance): AttendanceStatusDto => ({
  status: attendance.status,
  createdAt: attendance.createdAt.toISOString(),
  updatedAt: attendance.updatedAt.toISOString(),
});

export const attendanceController = {
  getStatus: async (
    req: Request<AttendanceStatusPathDto, AttendanceStatusResponseDto>,
    res: Response<AttendanceStatusResponseDto>,
    next: NextFunction
  ) => {
    try {
      const userId: UserIdPath = Number(req.params.userId);
      const eventId: EventIdPath = Number(req.params.eventId);

      const attendance = await attendanceService.getStatus(userId, eventId);

      return res.status(200).json({
        data: {
          attendanceStatus: mapAttendanceToDto(attendance),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
