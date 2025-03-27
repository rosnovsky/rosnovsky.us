import { Cpu, LayoutList, LocateFixed, Rocket, Users } from 'lucide-react';

import { cn } from '@utils/cn';

import { Badge } from '@components/ui/badge';

type TimelineItemProps = {
  title: string;
  description: string;
  icon: React.ElementType;
  image: {
    src: string;
    alt: string;
  };
  reverse?: boolean;
};

export const Timeline = ({ data }: { data: TimelineItemProps[] }) => {
  return (
    <section className="py-32">
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <Rocket className="size-4" />
            <span>Accelerate</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Accelerate your planning journey
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Take control of your workflow step-by-step with smart tools,
            actionable insights, and seamless collaboration
          </p>
        </div>
      </div>

      <div className="container overflow-hidden border-x pb-40 lg:pt-20 [&>*:last-child]:pb-20 [&>div>div:first-child]:!pt-20">
        {data.map((item, index) => (
          <div key={index} className="relative flex">
            <div
              className={`flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10 ${item?.reverse ? 'lg:flex-row-reverse lg:text-start' : ''} `}
            >
              <div className="flex-1 max-lg:hidden">
                <h3 className="text-2xl tracking-[-0.96px]">{item.title}</h3>
                <p
                  className={`mt-2.5 max-w-[300px] text-balance tracking-[-0.32px] text-muted-foreground ${item?.reverse ? '' : 'ml-auto'}`}
                >
                  {item.description}
                </p>
              </div>
              <div className="z-[-1] size-fit -translate-y-5 bg-background p-4 max-lg:-translate-x-4">
                <div className="rounded-[10px] border bg-card p-[5px] shadow-md">
                  <div className="size-fit rounded-md border bg-muted p-1">
                    <item.icon className="size-4 shrink-0" />
                  </div>
                </div>
              </div>
              <div className="flex-1 max-lg:-translate-x-4">
                <div className="text-start lg:pointer-events-none lg:hidden">
                  <h3 className="text-2xl tracking-[-0.96px]">{item.title}</h3>
                  <p className="mb-10 mt-2.5 max-w-[300px] text-balance tracking-[-0.32px] text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-start justify-start">
                  <div className={` ${item?.reverse ? 'lg:ml-auto' : ''}`}>
                    <div className="px-6 lg:px-10">
                      <DiagonalPattern className="h-6 lg:h-10" />
                    </div>
                    <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                      <DiagonalPattern className="h-full w-6 lg:w-10" />
                      <img
                        src={item.image.src}
                        width={400}
                        height={500}
                        alt={item.image.alt}
                        className="object-contain dark:invert"
                      />
                      <DiagonalPattern className="w-6 lg:w-10" />
                    </div>
                    <div className="px-6 lg:px-10">
                      <DiagonalPattern className="h-6 lg:h-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`absolute z-[-2] h-full w-[3px] translate-x-5 rounded-full lg:left-1/2 lg:-translate-x-1/2 ${index === data.length - 1 ? 'bg-gradient-to-b from-foreground/10 via-foreground/10 to-transparent' : 'bg-foreground/10'}`}
            >
              {index == 0 && (
                <div className="h-4 w-[3px] -translate-y-full bg-gradient-to-b from-transparent to-foreground/10"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

const DiagonalPattern = ({
  className,
  patternColor = 'hsl(var(--foreground))',
  patternOpacity = 0.15,
}: {
  className?: string;
  patternColor?: string;
  patternOpacity?: number;
}) => {
  const svgPattern = `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div
      className={cn('h-full w-full border-2 border-dashed', className)}
      style={{
        backgroundImage: svgPattern,
      }}
    />
  );
};
