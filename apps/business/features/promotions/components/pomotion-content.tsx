"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AddPromotionButton } from "@/features/promotions/components/add-promotion-button"
import { PromotionTable } from "@/features/promotions/components/promotion-table"
import { cn } from "@/lib/utils"
import { Promotion } from "@prisma/client"
import { useState } from "react"

interface Props {
  promotions: Promotion[]
}

export function PromotionContent({ promotions }: Props) {
  const [activeTab, setActiveTab] = useState(0)
  const today = new Date()
  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-center">
        <AddPromotionButton />
        <Button
          className={cn(activeTab === 0 && "font-bold")}
          variant="link"
          onClick={() => setActiveTab(0)}
        >
          Active
        </Button>
        <Separator className="bg-black" orientation="vertical" />
        <Button
          className={cn(activeTab === 1 && "font-bold")}
          variant="link"
          onClick={() => setActiveTab(1)}
        >
          Expired
        </Button>
      </div>
      <PromotionTable
        data={promotions.filter((item) =>
          activeTab ? item.expiration <= today : item.expiration > today
        )}
      />
    </div>
  )
}
