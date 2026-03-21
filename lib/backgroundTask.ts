import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import { isExpoGo } from './expoRuntime';
import { syncWidgetsAndStorage } from './storage';

export const MUSHAF_BG_TASK = 'mushaf-daily-sync';

if (!isExpoGo()) {
  TaskManager.defineTask(MUSHAF_BG_TASK, async () => {
    try {
      await syncWidgetsAndStorage();
      return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch {
      return BackgroundFetch.BackgroundFetchResult.Failed;
    }
  });
}

export async function registerMushafBackgroundFetch(): Promise<void> {
  if (isExpoGo()) {
    return;
  }

  const status = await BackgroundFetch.getStatusAsync();
  if (status === BackgroundFetch.BackgroundFetchStatus.Denied) {
    return;
  }

  await BackgroundFetch.registerTaskAsync(MUSHAF_BG_TASK, {
    minimumInterval: 60 * 60 * 4,
    stopOnTerminate: false,
    startOnBoot: true,
  });
}
