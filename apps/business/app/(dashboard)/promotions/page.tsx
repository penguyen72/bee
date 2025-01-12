import { getPromotions } from "@/actions/get-promotions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PromotionContent } from "@/features/promotions/components/pomotion-content"

export const dynamic = "force-dynamic"

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
              <p className="text-2xl font-semibold">0</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <PromotionContent promotions={data.promotions ?? []} />
    </div>
  )
}
