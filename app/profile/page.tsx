"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Shield, LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { userInfo, isAuthenticated, logout, updateCustomer, checkAuth ,isLoading } = useAuthStore();
  const [authChecking, setAuthChecking] = useState(true)
  // Estados para información personal
  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [phone, setPhone] = useState(userInfo?.phone || "");

  // Estados para actualización de contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados para feedback en formularios
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Check if we have auth data in localStorage for a quick initial check
      const hasAuthData = typeof window !== "undefined" && localStorage.getItem("auth-storage") !== null

      if (!hasAuthData) {
        // If no auth data in localStorage, redirect immediately
        router.push("/login?redirect=/profile")
        return
      }

      // Perform the full auth check
      const isAuth = await checkAuth()
      setAuthChecking(false)

      if (!isAuth) {
        // Only redirect if we're certain the user is not authenticated
        router.push("/login?redirect=/profile")
      }
    }

    checkAuthStatus()
  }, [checkAuth, router])

  // Actualiza la información personal del usuario
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess(false);
    if (!userInfo) return;
    const result = await updateCustomer(userInfo.id, { firstName, lastName, phone });
    if (result) {
      setProfileSuccess(true);
    } else {
      setProfileError("Error al actualizar el perfil");
    }
  };

  const handleProfileCancel = () => {
    setFirstName(userInfo?.firstName || "");
    setLastName(userInfo?.lastName || "");
    setPhone(userInfo?.phone || "");
    setProfileError("");
    setProfileSuccess(false);
  };

  // Actualiza la contraseña del usuario
  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);
    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }
    if (!userInfo) return;
    // Nota: Se podría incluir la contraseña actual si el endpoint lo requiere.
    const result = await updateCustomer(userInfo.id, { password: newPassword });
    if (result) {
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPasswordError("Error al actualizar la contraseña");
    }
  };

  const handlePasswordCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setPasswordSuccess(false);
  };

  if (!isAuthenticated || !userInfo) {
    return null;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Mi Perfil</h1>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-4">
          <TabsTrigger value="personal">Información Personal</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        {/* Formulario de información personal */}
        <TabsContent value="personal" className="mt-4">
          <form onSubmit={handleProfileUpdate}>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Información Personal</CardTitle>
                <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      className="text-sm"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      className="text-sm"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Tu apellido"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <div className="flex items-center gap-2">
                    <Input id="email" value={userInfo.email} readOnly className="cursor-not-allowed text-sm" />
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">El correo electrónico no se puede cambiar</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="phone"
                      value={phone}
                      className="text-sm"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Tu número de teléfono"
                    />
                    <Phone className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                {profileError && <p className="text-sm text-destructive">{profileError}</p>}
                {profileSuccess && <p className="text-sm text-green-600">Perfil actualizado exitosamente</p>}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handleProfileCancel} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Guardar cambios
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        {/* Formulario de actualización de contraseña */}
        <TabsContent value="security" className="mt-4">
          <form onSubmit={handlePasswordUpdate}>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Seguridad</CardTitle>
                <CardDescription>Administra tu contraseña y la seguridad de tu cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Contraseña actual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Contraseña actual"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nueva contraseña</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nueva contraseña"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirma la nueva contraseña"
                  />
                </div>
{/* 
                <Separator className="my-4" /> */}

                {/* <div className="space-y-4">
                  <h3 className="text-lg font-medium text-primary">Sesiones activas</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Sesión actual</p>
                          <p className="text-sm text-muted-foreground">
                            Iniciada el {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button type="button" variant="outline" size="sm">
                        Cerrar
                      </Button>
                    </div>
                  </div>
                </div> */}

                {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
                {passwordSuccess && <p className="text-sm text-green-600">Contraseña actualizada exitosamente</p>}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={handlePasswordCancel} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Actualizar contraseña
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
 
    </div>
  );
}
