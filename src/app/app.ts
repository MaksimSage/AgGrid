import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Header } from './core/header/header';
import {
  TuiAvatar,
  TuiAvatarStack,
  TuiBadge,
  TuiChevron,
  TuiChip,
  TuiComboBox,
  TuiDataListWrapper,
  TuiProgress,
  TuiSelect,
  TuiSkeleton,
} from '@taiga-ui/kit';
import {
  TuiButton,
  TuiCalendar,
  TuiFilterByInputPipe,
  TuiIcon,
  TuiInput,
  tuiItemsHandlersProvider,
  TuiNotificationService,
  TuiRoot,
  TuiTextfield,
} from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';

interface Institution {
  readonly id: number;
  readonly name: string;
  readonly site: string;
}

@Component({
  selector: 'app-root',
  imports: [
    Header,
    TuiRoot,
    FormsModule,
    TuiAvatar,
    TuiButton,
    TuiInput,
    TuiSkeleton,
    TuiTextfield,
    TuiRoot,
    TuiCalendar,
    TuiDataListWrapper,
    TuiSelect,
    TuiChip,
    TuiBadge,
    TuiProgress,
    TuiAvatarStack,
    TuiComboBox,
    TuiIcon,
    TuiChevron,
    TuiFilterByInputPipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: signal((x: Institution | null) => x?.name ?? ''),
      identityMatcher: signal((a: Institution, b: Institution) => a.id === b.id),
    }),
  ],
})
export class App {
  private alerts = inject(TuiNotificationService);

  protected skeleton = true;
  protected value: TuiDay | null = null;

  protected readonly institutions: Institution[] = [
    { id: 1, name: 'Портал Госуслуги', site: 'https://www.gosuslugi.ru' },
    { id: 2, name: 'ФНС России (Налоговая)', site: 'https://www.nalog.gov312.r11u' },
    { id: 3, name: 'Социальный фонд России (СФР)', site: 'https://sfr.gov.ru' },
    { id: 4, name: 'Росреестр', site: 'https://rosreestr.gov.ru' },
    { id: 5, name: 'ГИБДД', site: 'https://гибдд.рф' },
    { id: 6, name: 'Минцифры России', site: 'https://digital.gov.ru' },
    { id: 7, name: 'Минздрав России', site: 'https://minzdrav.gov.ru' },
    { id: 8, name: 'Центральный Банк РФ', site: 'https://www.cbr.ru' },
    { id: 9, name: 'ФССП (Судебные приставы)', site: 'https://fssp.gov.ru' },
    { id: 10, name: 'МВД России', site: 'https://мвд.рф' },
    { id: 11, name: 'Роспотребнадзор', site: 'https://rospotrebnadzor.ru' },
    { id: 12, name: 'Роструд', site: 'https://rostrud.gov.ru' },
  ];

  protected valueSelect: Institution | null = null;

  protected onDayClick(day: TuiDay): void {
    this.value = day;
  }

  protected openSite(): void {
    if (!this.valueSelect?.site) {
      return;
    }
    try {
      new URL(this.valueSelect.site);

      window.open(this.valueSelect.site, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('❌ Ошибка перехода по ссылке:', {
        institution: this.valueSelect.name,
        url: this.valueSelect.site,
        error: error,
        timestamp: new Date().toISOString(),
      });
      this.alerts
        .open(`При переходе на страницу ${this.valueSelect.name}`, {
          label: 'Упс, произошла ошибка',
          appearance: 'negative',
        })
        .subscribe();
    }
  }
}
