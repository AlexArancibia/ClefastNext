"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/authStore"
import { useMainStore } from "@/stores/mainStore"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Search,
  ShoppingBag,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  CreditCard,
  MapPin,
  Truck,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { OrderFinancialStatus, OrderFulfillmentStatus, ShippingStatus } from "@/types/common"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { JSX } from "react"

export default function OrdersPage() {
  const { userInfo, isAuthenticated } = useAuthStore()
  const { orders, fetchOrders, loading,shopSettings } = useMainStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (isAuthenticated && userInfo?.id) {
      fetchOrders().catch((error) => {
        toast.error("Error al cargar los pedidos")
        console.error("Error fetching orders:", error)
      })
    }
  }, [isAuthenticated, userInfo, fetchOrders])

  if (!isAuthenticated) {
    return (
      <div className="container-section py-10">
        <div className="content-section">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Acceso restringido</h3>
              <p className="text-center text-muted-foreground mb-4">Debes iniciar sesión para ver tus pedidos.</p>
              <Button>Iniciar sesión</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Filter orders by customer ID
  const customerOrders = orders.filter((order) => order.customerId === userInfo?.id)

  // Filter by search term
  const filteredOrders = customerOrders.filter((order) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      order.orderNumber.toString().includes(searchLower) ||
      order.financialStatus?.toLowerCase().includes(searchLower) ||
      order.fulfillmentStatus?.toLowerCase().includes(searchLower) ||
      order.shippingStatus?.toLowerCase().includes(searchLower)
    )
  })

  // Filter by status
  const getOrdersByStatus = (status: string) => {
    if (status === "all") return filteredOrders

    return filteredOrders.filter((order) => {
      if (status === "pending") {
        return order.financialStatus === OrderFinancialStatus.PENDING || order.shippingStatus === ShippingStatus.PENDING
      }
      if (status === "processing") {
        return (
          order.shippingStatus === ShippingStatus.READY_FOR_SHIPPING ||
          order.fulfillmentStatus === OrderFulfillmentStatus.IN_PROGRESS
        )
      }
      if (status === "completed") {
        return order.shippingStatus === ShippingStatus.DELIVERED && order.financialStatus === OrderFinancialStatus.PAID
      }
      if (status === "cancelled") {
        return order.financialStatus === OrderFinancialStatus.VOIDED
      }
      return false
    })
  }

  const displayOrders = getOrdersByStatus(activeTab)

  // Get status badge color
  const getStatusBadge = (order: any) => {
    // Determine the most relevant status to display
    let status: string
    let icon: JSX.Element

    if (order.financialStatus === OrderFinancialStatus.VOIDED) {
      status = "Cancelado"
      icon = <AlertCircle className="mr-1 h-3 w-3" />
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          {icon}
          {status}
        </Badge>
      )
    }

    if (order.shippingStatus === ShippingStatus.DELIVERED) {
      status = "Entregado"
      icon = <CheckCircle className="mr-1 h-3 w-3" />
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {icon}
          {status}
        </Badge>
      )
    }

    if (order.shippingStatus === ShippingStatus.IN_TRANSIT) {
      status = "En tránsito"
      icon = <Package className="mr-1 h-3 w-3" />
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {icon}
          {status}
        </Badge>
      )
    }

    if (order.shippingStatus === ShippingStatus.READY_FOR_SHIPPING) {
      status = "Procesando"
      icon = <Package className="mr-1 h-3 w-3" />
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {icon}
          {status}
        </Badge>
      )
    }

    if (order.financialStatus === OrderFinancialStatus.PENDING) {
      status = "Pendiente de pago"
      icon = <Clock className="mr-1 h-3 w-3" />
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          {icon}
          {status}
        </Badge>
      )
    }

    if (order.shippingStatus === ShippingStatus.PENDING) {
      status = "Pendiente de envío"
      icon = <Clock className="mr-1 h-3 w-3" />
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          {icon}
          {status}
        </Badge>
      )
    }

    // Default case
    return <Badge variant="outline">{order.financialStatus || order.shippingStatus}</Badge>
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  return (
    <div className="container-section py-10">
      <div className="content-section">
        <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número de pedido o estado..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full md:w-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="processing">Procesando</TabsTrigger>
            <TabsTrigger value="completed">Completados</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <Skeleton className="h-5 w-32 mb-2" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                        <Skeleton className="h-6 w-24" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : displayOrders.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card>
                  <CardContent className="pt-6 flex flex-col items-center justify-center py-10">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-center text-muted-foreground">
                      No tienes pedidos {activeTab !== "all" ? `con estado "${activeTab}"` : ""}.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {displayOrders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className="overflow-hidden border-l-4 hover:shadow-md transition-shadow"
                        style={{
                          borderLeftColor:
                            order.financialStatus === OrderFinancialStatus.VOIDED
                              ? "#f87171"
                              : order.shippingStatus === ShippingStatus.DELIVERED
                                ? "#34d399"
                                : order.financialStatus === OrderFinancialStatus.PENDING
                                  ? "#fbbf24"
                                  : "#60a5fa",
                        }}
                      >
                        <CardHeader className="bg-muted/30 pb-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <CardTitle className="text-lg">Pedido #{order.orderNumber}</CardTitle>
                              <CardDescription className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {formatDate(order.createdAt)}
                              </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">{getStatusBadge(order)}</div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex items-start gap-2">
                                <ShoppingBag className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                  <h4 className="font-medium text-sm">Productos</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {order.lineItems.length} {order.lineItems.length === 1 ? "producto" : "productos"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                  <h4 className="font-medium text-sm">Total</h4>
                                  <p className="text-sm font-medium">
                                    {order.currency?.symbol || "$"}
                                    {Number(order.totalPrice).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <Truck className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                  <h4 className="font-medium text-sm">Método de pago</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {order.paymentProvider?.name || "No especificado"}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {expandedOrderId === order.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="pt-4 border-t"
                              >
                                <div className="space-y-4">
                                  <h4 className="font-medium">Productos</h4>
                                  <div className="space-y-2">
                                    {order.lineItems.map((item: any, index: number) => (
                                      <div
                                        key={index}
                                        className="flex justify-between text-sm py-2 border-b last:border-b-0"
                                      >
                                        <div>
                                          <p className="font-medium">{item.title}</p>
                                          <p className="text-muted-foreground">Cantidad: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">
                                          {order.currency?.symbol || "$"}
                                          {Number(item.price * item.quantity).toFixed(2)}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0 pb-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleOrderExpand(order.id)}
                            className="text-muted-foreground"
                          >
                            {expandedOrderId === order.id ? (
                              <>
                                <ChevronUp className="mr-1 h-4 w-4" />
                                Ocultar detalles
                              </>
                            ) : (
                              <>
                                <ChevronDown className="mr-1 h-4 w-4" />
                                Ver productos
                              </>
                            )}
                          </Button>
                          <Button onClick={() => handleViewDetails(order)} variant="outline" size="sm">
                            Ver detalles completos
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl z-[460] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Detalles del Pedido #{selectedOrder?.orderNumber}</DialogTitle>
            <DialogDescription>Realizado el {selectedOrder && formatDate(selectedOrder.createdAt)}</DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4">
            {selectedOrder && (
              <div className="space-y-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Estado del pedido</h3>
                  {getStatusBadge(selectedOrder)}
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Productos</h3>
                  <div className="space-y-4">
                    {selectedOrder.lineItems.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                        <div className="flex-1">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-medium">
                          {selectedOrder.currency?.symbol || "$"}
                          {Number(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Resumen de pago</h3>
                  <div className="space-y-2">
                    {(() => {
const subtotal = Number(selectedOrder?.subtotalPrice) || 0;
const totalPrice = Number(selectedOrder?.totalPrice) || 0;
const totalTax = Number(selectedOrder?.totalTax) || 0;
 
// Asegurar que shipping no sea negativo
const shipping = Number(totalPrice) - Number(subtotal)  

 
 
  

 


                      return (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>
                              {selectedOrder.currency?.symbol || "$"}
                              {(subtotal-totalTax).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Impuestos
                            </span>
                            <span>
                              {selectedOrder.currency?.symbol || "$"}
                              {totalTax.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Envío</span>
                            <span>
                              {selectedOrder.currency?.symbol || "$"}
                              {shipping.toFixed(2)}
                            </span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-medium">
                            <span>Total</span>
                            <span>
                              {selectedOrder.currency?.symbol || "$"}
                              {totalPrice.toFixed(2)}
                            </span>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Dirección de envío
                    </h3>
                    {selectedOrder.shippingAddress ? (
                      <div className="text-sm">
                        <p>
                          {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                        </p>
                        <p>{selectedOrder.shippingAddress.address1}</p>
                        {selectedOrder.shippingAddress.address2 && <p>{selectedOrder.shippingAddress.address2}</p>}
                        <p>
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.province}{" "}
                          {selectedOrder.shippingAddress.zip}
                        </p>
                        {selectedOrder.shippingAddress.phone && <p>Tel: {selectedOrder.shippingAddress.phone}</p>}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No hay información de envío disponible</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Método de pago
                    </h3>
                    <div className="text-sm">
                      <p>{selectedOrder.paymentProvider?.name || "No especificado"}</p>
                      <p className="text-muted-foreground mt-1">
                        Estado:{" "}
                        {selectedOrder.financialStatus === OrderFinancialStatus.PAID
                          ? "Pagado"
                          : selectedOrder.financialStatus === OrderFinancialStatus.PENDING
                            ? "Pendiente"
                            : selectedOrder.financialStatus === OrderFinancialStatus.VOIDED
                              ? "Cancelado"
                              : selectedOrder.financialStatus}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedOrder.customerNotes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-medium mb-2">Notas del cliente</h3>
                      <p className="text-sm text-muted-foreground">{selectedOrder.customerNotes}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </ScrollArea>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setIsDialogOpen(false)}>Cerrar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

