/**
 * Calculate work experience from a given start date
 * @param {string} startDateString - Start date in YYYY-MM-DD format
 * @returns {Object} - Object containing years and months of experience
 */
export const calculateExperience = (startDateString) => {
    const startDate = new Date(startDateString);
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    return { years, months };
  };
  
  /**
   * Format experience duration for display
   * @param {number} years - Number of years
   * @param {number} months - Number of months
   * @returns {string} - Formatted duration string
   */
  export const formatExperienceDuration = (years, months) => {
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    }
    
    if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
    
    return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
  };
  
  /**
   * Calculate age from birth date
   * @param {string} birthDateString - Birth date in YYYY-MM-DD format
   * @returns {number} - Age in years
   */
  export const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };