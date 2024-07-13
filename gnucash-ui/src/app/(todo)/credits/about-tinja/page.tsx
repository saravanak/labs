'use client';
import { Button } from '@/components/ui/button';
import ListItem from '@/components/ui/lists/list-item';
import PropertyListItem from '@/components/ui/lists/property-list-item';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
const anchorClass = 'underline underline-offset-2 font-bold text-primary';

const ProjectRefs = ({ links }: any) => {
  return links.map(({ label, url }: any) => {
    return (
      <a
        key={label}
        className={cn(anchorClass, 'pr-2')}
        href={url}
        target='_blank'
      >
        {label}
      </a>
    );
  });
};

export default function AboutApp() {
  const router = useRouter();
  return (
    <>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        drawBorder={true}
        property='About'
        valueRenderer={() =>
          'This is a demo app for todos, to showcase my skills in Frontend and Backend development'
        }
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        drawBorder={true}
        property='Space and Todos'
        valueRenderer={() => (
          <div className='flex items-center flex-col'>
            <ul className='list-disc'>
              <li>
                <b>Todos</b> are your todos. With title, description and a
                status.{' '}
              </li>
              <li>
                You can group a collection of todos as a <b>Space</b>
              </li>
              <li> You can share your space to someone</li>
              <li> Someone can also add you to their spaces</li>
              <li>
                {' '}
                This simple arragment, in my view can double up as many things:
                todos, office tasks, message board, private groups, etc. Your
                imagination is the limit!! Enjoy!!
              </li>
            </ul>
            <Button className='mt-4' onClick={() => router.push('/login')}>
              Login
            </Button>
          </div>
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Terms and GPDR'
        drawBorder={true}
        valueRenderer={() =>
          'This is a toy right now, as claimed on the login page. So no personal information is sought. Only session cookies are used for login and no marketing/analytical cookies are used'
        }
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Web'
        drawBorder={true}
        valueRenderer={() => (
          <a className={anchorClass} href='https://nextjs.org/' target='_blank'>
            Next.js
          </a>
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='API'
        drawBorder={true}
        valueRenderer={() => (
          <>
            <a className={anchorClass} href='https://trpc.io/' target='_blank'>
              tRPC
            </a>
            &nbsp;over&nbsp;
            <a
              className={anchorClass}
              href='https://react-query.tanstack.com/'
              target='_blank'
            >
              React Query
            </a>
          </>
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Authentication'
        drawBorder={true}
        valueRenderer={() => (
          <a
            className={anchorClass}
            href='https://next-auth.js.org/'
            target='_blank'
          >
            Next Auth aka Auth.js
          </a>
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Styling'
        drawBorder={true}
        valueRenderer={() => (
          <a
            className={anchorClass}
            href='https://tailwindcss.com/'
            target='_blank'
          >
            Tailwind CSS
          </a>
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Components'
        drawBorder={true}
        valueRenderer={() => (
          <ProjectRefs
            links={[
              { label: 'shadcn', url: 'https://ui.shadcn.com/' },
              { label: 'cva', url: 'https://cva.style/' },
              { label: 'radix-ui', url: 'https://www.radix-ui.com/primitives' },
            ]}
          />
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Icons'
        drawBorder={true}
        valueRenderer={() => (
          <a className={anchorClass} href='https://lucide.dev/' target='_blank'>
            Lucid React
          </a>
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='ORM/SQL'
        drawBorder={true}
        valueRenderer={() => (
          <ProjectRefs
            links={[
              { label: 'Prisma', url: 'https://www.prisma.io/' },
              { label: 'pg-typed', url: 'https://github.com/adelsz/pgtyped' },
              { label: 'Postgres', url: 'https://postgresql.org/' },
            ]}
          />
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Tour'
        drawBorder={true}
        valueRenderer={() => (
          <ProjectRefs
            links={[{ label: 'reactour', url: 'https://docs.react.tours/' }]}
          />
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Forms'
        drawBorder={true}
        valueRenderer={() => (
          <ProjectRefs
            links={[
              {
                label: 'React Hook Forms',
                url: 'https://react-hook-form.com/',
              },
            ]}
          />
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Source'
        drawBorder={true}
        valueRenderer={() => (
          <ProjectRefs
            links={[
              {
                label: 'Github',
                url: 'https://github.com/saravanak/labs/tree/gnuplot-go-bridge/gnucash-ui/',
              },
            ]}
          />
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Server'
        drawBorder={true}
        valueRenderer={() => (
          <ProjectRefs
            links={[
              {
                label: 'DigitalOcean Droplets',
                url: 'https://www.digitalocean.com/',
              },
            ]}
          />
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Deployment and Provisioning'
        drawBorder={true}
        valueRenderer={() => (
          <ProjectRefs
            links={[{ label: 'Ansible', url: 'https://docs.ansible.com/' }]}
          />
        )}
      ></PropertyListItem>
      <PropertyListItem
        valueClassNames='min-w-[70%] max-w-[70%]'
        property='Hugs for Misses'
        drawBorder={true}
        valueRenderer={() =>
          'There are a lot more projects and references that I got from a lot of places. Thanks to those of you!'
        }
      ></PropertyListItem>
    </>
  );
}
