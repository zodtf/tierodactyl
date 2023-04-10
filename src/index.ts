import { fetchAndUpdateServers } from './hierarchySystem';

/* TODO:
*   TieroCore
*    - Add command line options so this can actually be a CLI tool
*    - Replace console.log with winston logging
*    - Add a config file for the hierarchy master directory for more flexibility
*    - Add glorious chalk colors
*    - Add a progress bar for the upload (CLI progress bar)
*   Dactyl
*    **Should this go in a separate repo?**
*    - Start building the pterodactyl custom panel element for the hierarchy system, called 'Dactyl'
*    - ( see your previous generations with GPT-4 about this )
*      - Requires a Laravel package
*      - VueJS frontend
*      - PHP artisan commands
*      - TOO MUCH PHP!!!!
* */


async function main() {
    try {
        await fetchAndUpdateServers();
        console.log('Servers updated successfully.');
    } catch (error) {
        console.error('Error updating servers:', error);
    }
}

main();