"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { BicepsFlexedIcon, CalendarIcon, Dumbbell, MoveHorizontalIcon, Save, ScaleIcon, User } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const muscleGroups = [
  { value: "peito", label: "Peito" },
  { value: "costas", label: "Costas" },
  { value: "pernas", label: "Pernas" },
  { value: "ombros", label: "Ombros" },
  { value: "bracos", label: "Braços" },
  { value: "abdomen", label: "Abdômen" },
  { value: "gluteos", label: "Glúteos" },
  { value: "completo", label: "Corpo Completo" },
]

const formSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres.",
  }),
  birthDate: z.date({
    required_error: "A data de nascimento é obrigatória.",
  }),
  gender: z.enum(["masculino", "feminino"], {
    required_error: "Por favor selecione o sexo.",
  }),
  weeklyWorkouts: z.number().min(1).max(6),
  focusGroup: z.string({
    required_error: "Por favor selecione um grupo muscular.",
  }),
  goal: z.enum(["perder_peso", "ganhar_massa", "ganhar_forca", "manter"], {
    required_error: "Por favor selecione um objetivo.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function StudentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      weeklyWorkouts: 1,
      birthDate: undefined,
      gender: undefined,
      focusGroup: undefined,
      goal: undefined,
    },
  })

  function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    // Simulando uma chamada de API
    setTimeout(() => {
      console.log(data)
      toast({
        title: "Dados salvos com sucesso!",
        type: "foreground",
        description: "Os dados do aluno foram salvos com sucesso.",
        color: "green",
      })
      handleReset()
      setIsSubmitting(false)
    }, 1000)
  }

  function handleReset() {
    form.reset({
      name: "",
      birthDate: undefined,
      gender: undefined,
      weeklyWorkouts: 1,
      focusGroup: undefined,
      goal: undefined,
    })
  }

  // criar funcao que aplicar algumas classes de acordo com o valor do campo
  function applyBorderStyleRules(fieldValue: string, selectedValue: string) {
    return cn(
      "flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4",
      fieldValue === selectedValue && "border-primary",
    ); 
  }

  function applyIconColorStyleRules(fieldValue: string, selectedValue: string) {
    return cn(
      "h-6 w-6 text-primary",
      fieldValue === selectedValue ? "text-green-500" : "text-primary",
    ); 
  }

  return (
    <Card className="mx-auto max-w-2xl backdrop-blur-sm bg-background/90 shadow-float border-green-600/10 border-2">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-green-600/5 rounded-t-lg"></div>
        <CardTitle className="flex items-center gap-2 relative z-10">
          <User className="h-5 w-5 text-green-600" />
          Cadastro de Aluno
        </CardTitle>
        <CardDescription className="relative z-10">Preencha os dados do aluno para criar um novo cadastro.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo do aluno" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data de Nascimento</FormLabel>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={isSubmitting}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date);
                            setCalendarOpen(false);
                          }
                        }}
                        disabled={(date) => 
                          date < new Date(1940, 0, 1) || 
                          date > new Date(2009, 11, 31)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Sexo</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      value={field.value} 
                      className="flex space-x-4" 
                      disabled={isSubmitting}
                    >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem 
                          value="masculino"
                          className={field.value === "masculino" ? "text-green-500 border-primary" : ""}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Masculino</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                          value="feminino" 
                          className={field.value === "feminino" ? "text-green-500 border-primary" : ""}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Feminino</FormLabel>
                        </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weeklyWorkouts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade de Treinos na Semana</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        min={1}
                        max={6}
                        step={1}
                        defaultValue={[1]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                        onReset={() => field.onChange(1)}
                        value={[field.value]}
                        disabled={isSubmitting}
                      />
                      <div className="flex justify-between">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <span
                            key={num}
                            className={cn(
                              "text-xs",
                              field.value === num ? "text-green-500 font-bold" : "text-muted-foreground"
                            )}
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>Selecione entre 1 e 6 treinos por semana.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="focusGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grupo Muscular de Ênfase</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className={cn(field.value && "text-green-500 font-semibold")}>
                        <SelectValue placeholder="Selecione um grupo muscular" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {muscleGroups.map((group) => (
                        <SelectItem key={group.value} value={group.value}>
                          {group.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Objetivo Geral</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-4"
                      disabled={isSubmitting}
                    >
                            <Label
                            htmlFor="perder_peso"
                            className={applyBorderStyleRules(field.value, "perder_peso")}
                            >
                            <RadioGroupItem value="perder_peso" id="perder_peso" className="sr-only" />
                            <div className="mb-3 rounded-full bg-primary/10 p-2">
                            <ScaleIcon className={applyIconColorStyleRules(field.value, "perder_peso")} />
                            </div>
                            <div className="space-y-1 text-center">
                            <p className={cn("text-sm leading-none", field.value === "perder_peso" ? "font-semibold" : "font-medium")}>Perder Peso</p>
                            </div>
                            </Label>
                          <Label
                          htmlFor="ganhar_massa"
                          className={applyBorderStyleRules(field.value, "ganhar_massa")}
                          >
                          <RadioGroupItem value="ganhar_massa" id="ganhar_massa" className="sr-only" />
                          <div className="mb-3 rounded-full bg-primary/10 p-2">
                            <BicepsFlexedIcon className={applyIconColorStyleRules(field.value, "ganhar_massa")} />
                          </div>
                          <div className="space-y-1 text-center">
                            <p className={cn("text-sm leading-none", field.value === "ganhar_massa" ? "font-semibold" : "font-medium")}>Ganhar Massa</p>
                          </div>
                          </Label>
                          <Label
                          htmlFor="ganhar_forca"
                          className={applyBorderStyleRules(field.value, "ganhar_forca")}
                          >
                          <RadioGroupItem value="ganhar_forca" id="ganhar_forca" className="sr-only" />
                          <div className="mb-3 rounded-full bg-primary/10 p-2">
                            <Dumbbell className={applyIconColorStyleRules(field.value, "ganhar_forca")} />
                          </div>
                          <div className="space-y-1 text-center">
                            <p className={cn("text-sm leading-none", field.value === "ganhar_forca" ? "font-semibold" : "font-medium")}>Ganhar Força</p>
                          </div>
                          </Label>
                          <Label
                          htmlFor="manter"
                          className={applyBorderStyleRules(field.value, "manter")}
                          >
                          <RadioGroupItem value="manter" id="manter" className="sr-only" />
                          <div className="mb-3 rounded-full bg-primary/10 p-2">
                            <MoveHorizontalIcon className={applyIconColorStyleRules(field.value, "manter")} />
                          </div>
                          <div className="space-y-1 text-center">
                            <p className={cn("text-sm leading-none", field.value === "manter" ? "font-semibold" : "font-medium")}>Manter</p>
                          </div>
                          </Label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleReset} 
                disabled={isSubmitting}
                className="transition-all hover:shadow-sm"
              >
                Limpar
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="transition-all bg-gradient-to-r from-green-600 to-green-500 hover:shadow-float-strong"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">◌</span> Salvando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" /> Salvar
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

