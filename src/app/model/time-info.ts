export interface TimeInfo {
    ianaTimeId: string;
    displayName: string;
    effectiveTimeZoneFull: string;
    effectiveTimeZoneShort: string;
    utcOffsetSeconds: number;
    utcOffset: string;
    isDaylightSavingTime: boolean
    localTime: string;

}
