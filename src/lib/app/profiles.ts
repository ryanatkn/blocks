import { defaultLayouts, type Layout } from "$lib/app/layouts";

export interface Profile {
  name: string;
  layouts: Layout[];
}

// TODO ?
export const defaultProfiles: Profile[] = [{
  name: 'initial',
  layouts: defaultLayouts
}
];