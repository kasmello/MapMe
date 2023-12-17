import { animate, style, transition, trigger, sequence, group } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('150ms', style({ opacity: 1 }))
  ])
]);

export const transitionFadeLeft = trigger('fromLeft', [
    transition(':enter', [
        group([
            style({ opacity: 0, transform: 'translateX(-15vw)' }),
            animate('400ms ease-in-out', style({ transform: 'translateX(0)',opacity: 1 }))
          ])
    ])
      
  ]);