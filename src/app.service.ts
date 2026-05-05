import { Injectable } from '@nestjs/common';
import { ConductorService } from './conductors/conductors.service';
import { DriversService } from './drivers/drivers.service';
import { UnitService } from './unit/unit.service';
import { EmployeeService } from './employee/employee.service';
import { FleetService } from './fleets/fleets.service';
import { GPSDeviceService } from './gps-device/gps-device.service';
import { LapCounterSettingsService } from './lap-counter-settings/lap-counter-settings.service';
import { LapRecordService } from './lap-record/lap-record.service';
import { RouteService } from './route/route.service';

@Injectable()
export class AppService {
  constructor(
    private readonly conductorService: ConductorService,
    private readonly driverService: DriversService,
    private readonly unitService: UnitService,
    private readonly employeeService: EmployeeService,
    private readonly fleetService: FleetService,
    private readonly gpsDeviceService: GPSDeviceService,
    private readonly lapCounterService: LapCounterSettingsService,
    private readonly lapRecordService: LapRecordService,
    private readonly routeService: RouteService,
  ) {}

  getHealthStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  async getDashboardStats(companyId: string) {
    const [
      conductors,
      drivers,
      units,
      employees,
      fleets,
      gpsDevices,
      routes,
      lapRecords,
    ] = await Promise.all([
      this.conductorService.getTotalRegistered(companyId),
      this.driverService.getTotalRegistered(companyId),
      this.unitService.getTotalRegistered(companyId),
      this.employeeService.getTotalRegistered(companyId),
      this.fleetService.getTotalRegistered(companyId),
      this.gpsDeviceService.getTotalRegistered(companyId),
      this.routeService.getTotalRegistered(companyId),
      this.lapRecordService.getTotalRegistered(companyId),
    ]);

    return {
      overview: {
        conductors,
        drivers,
        units,
        employees,
        fleets,
        gpsDevices,
        routes,
        lapRecords,
      },
      // systemHealth: {
      //   timestamp: new Date().toISOString(),
      //   uptime: process.uptime(),
      // },
    };
  }
}
