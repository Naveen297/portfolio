import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import AboutSection from '../AboutSection';

// Mock react-intersection-observer
jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(() => ({
    ref: jest.fn(),
    inView: true
  }))
}));

// Mock image imports
jest.mock('../../../assets/NM.jpg', () => 'test-image.jpg');
jest.mock('../../../assets/mm.png', () => 'test-logo.png');

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>
  }
}));

describe('AboutSection', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<AboutSection />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });

  it('displays profile information correctly', () => {
    render(<AboutSection />);
    
    expect(screen.getByText('Naveen Malhotra')).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Developer/)).toBeInTheDocument();
    expect(screen.getByText(/3D Web Developer/)).toBeInTheDocument();
    expect(screen.getByText(/AI\/ML Engineer/)).toBeInTheDocument();
  });

  it('displays current role information', () => {
    render(<AboutSection />);
    
    expect(screen.getByText('Current Role')).toBeInTheDocument();
    expect(screen.getByText('Application Developer')).toBeInTheDocument();
    expect(screen.getByText(/Mahindra and Mahindra LTD/)).toBeInTheDocument();
    expect(screen.getByText(/Mumbai/)).toBeInTheDocument();
  });

  it('displays education information', () => {
    render(<AboutSection />);
    
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Manipal University Jaipur')).toBeInTheDocument();
    expect(screen.getByText(/B.Tech in Computer & Communication Engineering/)).toBeInTheDocument();
    expect(screen.getByText('9.53')).toBeInTheDocument();
  });

  it('displays tech stack sections', () => {
    render(<AboutSection />);
    
    expect(screen.getByText('Current Tech Battlefield')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('AI/ML')).toBeInTheDocument();
    expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
  });

  it('displays tech skills correctly', () => {
    render(<AboutSection />);
    
    // Check for some key technologies
    expect(screen.getByText('React.js')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Three.js')).toBeInTheDocument();
    expect(screen.getByText('TensorFlow')).toBeInTheDocument();
  });

  it('displays personal traits', () => {
    render(<AboutSection />);
    
    expect(screen.getByText(/Innovation Focused/)).toBeInTheDocument();
    expect(screen.getByText(/Problem Solver/)).toBeInTheDocument();
    expect(screen.getByText(/Creative Thinker/)).toBeInTheDocument();
    expect(screen.getByText(/AI Enthusiast/)).toBeInTheDocument();
  });

  it('displays stats correctly', () => {
    render(<AboutSection />);
    
    expect(screen.getByText('5+')).toBeInTheDocument();
    expect(screen.getByText('Live Systems')).toBeInTheDocument();
    expect(screen.getByText('12+')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<AboutSection />);
    
    const profileImage = screen.getByAltText('Naveen Malhotra');
    expect(profileImage).toBeInTheDocument();
    
    const logoImage = screen.getByAltText('Mahindra Logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('contains all required sections', () => {
    render(<AboutSection />);
    
    // Check for main structural elements
    const section = screen.getByRole('region', { hidden: true }) || 
                   document.querySelector('section');
    expect(section).toBeInTheDocument();
    
    // Verify main content areas are present
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Current Tech Battlefield')).toBeInTheDocument();
  });
});