import * as z from "zod"

export const weighBridgeSchema = z.object({
  serialNo: z.string().min(1, "Serial number is required"),
  vehicleNo: z.string().min(1, "Vehicle number is required"),
  vehicleType: z.string().min(1, "Vehicle type is required"),
  charges: z.string().min(1, "Charges are required"),
  material: z.string().min(1, "Material is required"),
  partyRef: z.string().optional(),
  payment: z.string().min(1, "Payment details are required"),
  driver: z.string().min(1, "Driver name is required"),
  grossWeight: z.string().min(1, "Gross weight is required"),
  tareWeight: z.string().min(1, "Tare weight is required"),
  netWeight: z.string().min(1, "Net weight is required"),
  inDate: z.string().min(1, "In date is required"),
  inTime: z.string().min(1, "In time is required"),
  outDate: z.string().min(1, "Out date is required"),
  outTime: z.string().min(1, "Out time is required"),
})

