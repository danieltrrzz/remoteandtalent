import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'list/country/:name',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { name: 'Colombia' },
      { name: 'Argentina' },
      { name: 'Peru' },
      { name: 'Chile' },
      { name: 'Venezuela' },
      { name: 'Ecuador' },
      { name: 'Bolivia' },
      { name: 'Paraguay' },
      { name: 'Uruguay' },
      { name: 'Brasil' }
    ]
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
