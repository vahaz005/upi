import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { BankContext } from "@/context/BankProvider"
import { LoaderCircle } from "lucide-react"
import { useContext } from "react"
import { DataTableDemo } from "./TableTransaction"

export function TabsDemo() {
  const accountS = useContext(BankContext)
  if(accountS.length === 0){
    return (
      <div
      className="flex justify-center items-center w-full">
        <LoaderCircle width={20} height={20}/>
      </div>
    )
  }
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
       {
        accountS.map((account)=>
        <TabsTrigger  value={account.name}>{account.name}</TabsTrigger>
      )
       }
      </TabsList>
     {
      accountS.map((account)=>
        <TabsContent defaultChecked value={account.name}>
          <DataTableDemo/>
        </TabsContent>
      )
     }
    </Tabs>
  )
}
