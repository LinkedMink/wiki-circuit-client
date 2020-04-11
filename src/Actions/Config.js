export const SAVE_CONFIG = 'SAVE_CONFIG';

export function saveConfig(config) {
  return { 
    type: SAVE_CONFIG, 
    payload: config
  };
}
