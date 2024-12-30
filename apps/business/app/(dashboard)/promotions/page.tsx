import { getPromotions } from "@/actions/get-promotions"
import { AddPromotionButton } from "@/components/business/promotions/add-promotion-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PromotionTable } from "@/features/promotions/components/promotion-table"

export default async function Home() {
  const data = await getPromotions()

  if (data.error) return null

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Promotions</CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="bg-rose-300">
            <CardHeader className="px-4 pt-4 pb-2">
              <p className="font-semibold">Members Redeemed</p>
            </CardHeader>
            <CardContent className="px-4 pt-0 pb-4">
              <p className="text-2xl font-semibold">15</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <div className="flex flex-col">
        <div className="relative flex items-center justify-center">
          <AddPromotionButton />
          <Button variant="link">Active</Button>
          <Separator className="bg-black" orientation="vertical" />
          <Button variant="link">Expired</Button>
        </div>
        <PromotionTable data={data.promotions ?? []} />
      </div>
    </div>
  )
}
