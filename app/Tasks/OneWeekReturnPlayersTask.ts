import { BaseTask } from 'adonis5-scheduler/build'

export default class OneWeekReturnPlayersTask extends BaseTask {
	public static get schedule() {
		return '* * * * * *'
	}
	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}

	public async handle() {
    	this.logger.info('Handled')
  	}
}
