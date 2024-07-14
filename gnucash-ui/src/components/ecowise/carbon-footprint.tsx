'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmissionVehiclesModel } from '@/lib/prisma/zod';
import { trpc } from '@/utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import SimpleCard from '../ui/ui-hoc/simple-card';
import FootprintGeneralQuestions from './footprint-general-questions';
import FootprintVehicleData from './footprint-vehicle-data';
import HocSelect from '../ui/ui-hoc/hoc-select';
import { useQueries } from '@tanstack/react-query';

export default function CarbonFootprintCalculator() {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        country: z.string(),
        houseSize: z.coerce.number().min(2.5).max(6),
        householdIncome: z.coerce.number().min(10).max(100),
        vehicles: z.array(EmissionVehiclesModel.omit({ id: true })),
        unit: z.enum(['metric', 'standard']),
        timespan: z.enum(['yearly', 'monthly']),
      })
    ),
    defaultValues: {
      country: '',
      houseSize: 2.5,
      hosueholdIncome: 10,
      vehicles: [
        {
          milesPerGallon: 3,
          milesPerYear: 5,
          fuelType: 'diesel',
        },
      ],
    },
  });

  const { control } = form;

  const [{ data: countries }, { data: formMeta }] = trpc.useQueries((t) => [
    t.country.list(undefined, {
      select: (d) => {
        return d.map(({ name, id }: any) => {
          return {
            label: name,
            value: name,
          };
        });
      },
      staleTime: 10000,
    }),
    t.carbonFootprint.formMeta(),
  ]);

  const title = (
    <div className='flex justify-between'>
      <div>Carbon footprint</div>
      <HocSelect
        selectLabelInline='Units to use'
        options={[
          { label: 'Metric', value: 'metric' },
          { label: 'Standard', value: 'standard' },
        ]}
      ></HocSelect>
    </div>
  );

  const additionalContext = { ...form, formMeta };

  return (
    <SimpleCard title={title}>
      {countries ? (
        <Form {...additionalContext}>
          <form
            onSubmit={form.handleSubmit((d) => {})}
            className='space-y-8'
          >
            <Tabs defaultValue='start' className='w-[400px] flex-grow'>
              <TabsList>
                <TabsTrigger value='start'>Start</TabsTrigger>
                <TabsTrigger value='travel'>Travel</TabsTrigger>
              </TabsList>
              <TabsContent value='start'>
                <FootprintGeneralQuestions
                  countries={countries}
                  formMeta={formMeta}
                />
              </TabsContent>
              <TabsContent value='travel'>
                <FootprintVehicleData form={form} dataKey='vehicles' />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      ) : null}
    </SimpleCard>
  );
}
