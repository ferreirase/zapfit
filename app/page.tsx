import StudentForm from "@/components/student-form"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { cn } from "@/lib/utils"
import { ActivityIcon, BicepsFlexedIcon, ClipboardListIcon, Dumbbell, HeartPulseIcon, MessageSquare, ScaleIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ZapFit",
  description: "Aplicativo para gerenciar dados de alunos de academia",
}

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Fundo diagonal verde */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-green-600/20 dark:bg-green-600/10 transform rotate-12 origin-top-left translate-y-[-35%] translate-x-[-10%] rounded-[100%] w-[140%] h-[140%]"></div>
        
        {/* Ícones espalhados pelo fundo */}
        <div className="absolute inset-0 z-0">
          {/* Primeira linha de ícones */}
          <BicepsFlexedIcon className="absolute text-green-600/30 dark:text-green-600/20 w-12 h-12 top-[15%] left-[10%] animate-float-slow" />
          <Dumbbell className="absolute text-green-600/25 dark:text-green-600/15 w-14 h-14 top-[25%] left-[35%] animate-float" />
          <ScaleIcon className="absolute text-green-600/20 dark:text-green-600/10 w-10 h-10 top-[10%] left-[60%] animate-float-delay" />
          <ClipboardListIcon className="absolute text-green-600/30 dark:text-green-600/20 w-16 h-16 top-[20%] left-[85%] animate-float-reverse" />
          
          {/* Segunda linha de ícones */}
          <HeartPulseIcon className="absolute text-green-600/25 dark:text-green-600/15 w-12 h-12 top-[45%] left-[15%] animate-float" />
          <ActivityIcon className="absolute text-green-600/20 dark:text-green-600/10 w-16 h-16 top-[55%] left-[40%] animate-float-slow" />
          <BicepsFlexedIcon className="absolute text-green-600/30 dark:text-green-600/20 w-10 h-10 top-[50%] left-[65%] animate-float-delay" />
          <ScaleIcon className="absolute text-green-600/25 dark:text-green-600/15 w-14 h-14 top-[40%] left-[90%] animate-float-reverse" />
          
          {/* Terceira linha de ícones */}
          <Dumbbell className="absolute text-green-600/20 dark:text-green-600/10 w-14 h-14 top-[75%] left-[5%] animate-float-slow" />
          <ClipboardListIcon className="absolute text-green-600/30 dark:text-green-600/20 w-12 h-12 top-[85%] left-[30%] animate-float" />
          <HeartPulseIcon className="absolute text-green-600/25 dark:text-green-600/15 w-16 h-16 top-[70%] left-[55%] animate-float-delay" />
          <ActivityIcon className="absolute text-green-600/20 dark:text-green-600/10 w-10 h-10 top-[80%] left-[80%] animate-float-reverse" />
        </div>
      </div>

      <div className="container mx-auto py-10 relative z-10">
        <header className="mb-8 flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-primary flex items-center justify-center gap-2">
              <MessageSquare className="h-8 w-8 text-green-600" />
              ZapFit
            </h1>
            <p className="text-muted-foreground">Seu agente de treino no Zap</p>
          </div>
          <div>
            <ModeToggle />
          </div>
        </header>
        <main>
          {/* Wrapper com efeito de flutuação para o formulário */}
          <div className={cn(
            "animate-float relative z-10",
            "before:absolute before:content-[''] before:inset-0 before:rounded-2xl before:bg-green-600/10 before:blur-lg before:z-[-1] before:transform before:scale-[1.02] before:animate-pulse"
          )}>
            <StudentForm />
          </div>
          
          {/* Elementos decorativos flutuantes */}
          <div className="absolute top-[10%] right-[5%] w-24 h-24 rounded-full bg-green-600/10 animate-float-slow z-0"></div>
          <div className="absolute bottom-[15%] left-[8%] w-16 h-16 rounded-full bg-green-600/15 animate-float-delay z-0"></div>
          <div className="absolute top-[35%] right-[12%] w-10 h-10 rounded-full bg-green-600/20 animate-float-reverse z-0"></div>
        </main>
      </div>
    </div>
  )
}

