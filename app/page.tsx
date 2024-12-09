"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { pdf } from "@react-pdf/renderer"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PDFTemplate } from "../components/pdf-template"
import { weighBridgeSchema } from "../schemas/form-schema"
import type { WeighBridgeForm } from "../types/form"

export default function WeighBridgeReceiptForm() {
  const [isGenerating, setIsGenerating] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<WeighBridgeForm>({
    resolver: zodResolver(weighBridgeSchema),
    defaultValues: {
      inDate: format(new Date(), "dd-MM-yyyy"),
      inTime: format(new Date(), "HH:mm"),
      outDate: format(new Date(), "dd-MM-yyyy"),
      outTime: format(new Date(), "HH:mm"),
      grossWeight: "0",
    },
  })

  const tareWeight = watch("tareWeight")
  const netWeight = watch("netWeight")

  useEffect(() => {
    const tare = parseFloat(tareWeight) || 0
    const net = parseFloat(netWeight) || 0
    const gross = (tare + net).toFixed(0)
    setValue("grossWeight", gross)
  }, [tareWeight, netWeight, setValue])

  const onSubmit = async (data: WeighBridgeForm) => {
    try {
      setIsGenerating(true)
      const pdfDoc = <PDFTemplate data={data} />
      const blob = await pdf(pdfDoc).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `maa_tara_weigh-bridge-receipt-${data.serialNo}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to generate PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">MAA TARA COMPUTERISED WEIGH BRIDGE</CardTitle>
        <CardTitle className="text-center">BANSARA, MORE, RANIGANJ, (WEST BENGAL)</CardTitle>
        <CardContent className="text-center">CAP.80MT APPROVED BY GOVT. WEST BENGAL (INDIA)</CardContent>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serialNo">Serial No.</Label>
              <Input id="serialNo" {...register("serialNo")} />
              {errors.serialNo && (
                <p className="text-sm text-red-500">{errors.serialNo.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleNo">Vehicle No.</Label>
              <Input id="vehicleNo" {...register("vehicleNo")} />
              {errors.vehicleNo && (
                <p className="text-sm text-red-500">{errors.vehicleNo.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Input id="vehicleType" {...register("vehicleType")} />
              {/* {errors.vehicleType && (
                <p className="text-sm text-red-500">{errors.vehicleType.message}</p>
              )} */}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="charges">Charges ₹</Label>
              <Input id="charges" {...register("charges")} />
              {errors.charges && (
                <p className="text-sm text-red-500">{errors.charges.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Input id="material" {...register("material")} />
              {errors.material && (
                <p className="text-sm text-red-500">{errors.material.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="partyRef">Party Ref.</Label>
              <Input id="partyRef" {...register("partyRef")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payment">Payment Mode</Label>
              <Input id="payment" {...register("payment")} />
              {errors.payment && (
                <p className="text-sm text-red-500">{errors.payment.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="driver">Driver</Label>
              <Input id="driver" {...register("driver")} />
              {errors.driver && (
                <p className="text-sm text-red-500">{errors.driver.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tareWeight">Tare Weight (In Kg)</Label>
              <Input id="tareWeight" {...register("tareWeight")} />
              {errors.tareWeight && (
                <p className="text-sm text-red-500">{errors.tareWeight.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="netWeight">Net Weight (In Kg)</Label>
              <Input id="netWeight" {...register("netWeight")} />
              {errors.netWeight && (
                <p className="text-sm text-red-500">{errors.netWeight.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="grossWeight">Gross Weight (In Kg)</Label>
              <Input id="grossWeight" {...register("grossWeight")} readOnly />
              {errors.grossWeight && (
                <p className="text-sm text-red-500">{errors.grossWeight.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="outDate">Out Date</Label>
              <Input id="outDate" {...register("outDate")} />
              {errors.outDate && (
                <p className="text-sm text-red-500">{errors.outDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="outTime">Out Time</Label>
              <div className="flex gap-2">
                <Input id="outTime" {...register("outTime")} />
              </div>
              {errors.outTime && (
                <p className="text-sm text-red-500">{errors.outTime.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inDate">In Date</Label>
              <Input id="inDate" {...register("inDate")} />
              {errors.inDate && (
                <p className="text-sm text-red-500">{errors.inDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="inTime">In Time</Label>
              <Input id="inTime" {...register("inTime")} />
              {errors.inTime && (
                <p className="text-sm text-red-500">{errors.inTime.message}</p>
              )}
            </div>
          </div>


          <Button type="submit" className="w-full" disabled={isGenerating}>
            {isGenerating ? "Generating PDF..." : "Generate & Download Invoices "}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

