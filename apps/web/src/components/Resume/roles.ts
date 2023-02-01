import { logoAtt, logoIntel, logoMicrosoft, logoOkta } from '@/images/logos';
import { StaticImageData } from 'next/image';

type Role = {
  company: string;
  title: string;
  logo: StaticImageData;
  start: string;
  end: string;
};

// TODO: fetch this from Sanity at some point
export const resumeRoles: Role[] = [
    {
      company: 'Okta',
      title: 'Software Engineer',
      logo: logoOkta,
      start: 'Dec 2019',
      end: 'Present',

    },
    {
      company: 'Microsoft',
      title: 'Software Engineer',
      logo: logoMicrosoft,
      start: 'May 2019',
      end: 'Oct 2019',
    },
    {
      company: 'AT&T',
      title: 'Web Developer',
      logo: logoAtt,
      start: 'Apr 2017',
      end: 'Oct 2018',
    },
    {
      company: 'Intel',
      title: 'Web Producer',
      logo: logoIntel,
      start: 'Dec 2016',
      end: 'Apr 2017',
    },
  ];
