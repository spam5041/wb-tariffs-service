import { SchedulerService } from './services/scheduler.service';
import { logger } from './utils/logger';

async function bootstrap() {
  try {
    const scheduler = new SchedulerService();
    scheduler.startScheduledTasks();
    logger.info('Application started successfully');
  } catch (error) {
    logger.error('Error starting application:', error);
    process.exit(1);
  }
}

bootstrap(); 