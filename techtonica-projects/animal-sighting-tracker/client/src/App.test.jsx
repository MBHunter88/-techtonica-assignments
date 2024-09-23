import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from './App';
import { Button} from 'react-bootstrap';
import { jest } from '@testing-library/jest-dom'




  test('renders species list fetched from database', async () => {
      // ARRANGE:
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { common_name: 'Harry Potter', number_in_wild: '3', scientific_name: 'leviosa patronum', conservation_status_code: 'Critically Endangered (CR)' }
        ]),
    })
  );


  render(<App />);

  // ACT & ASSERT:
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
  });
  })

  test('renders individuals on button click', async () => {
    //ARRANGE
    //mock data
    const item = { common_name: 'Red Wolf' }; 
    const handleShowIndividuals = vi.fn(); 
    const getPackName = (commonName) => {
      if (commonName === 'Red Wolf') {
        return 'the Pack';
      }
      return '';
    };
  
    render(
      <Button
        className="btn btn-primary"
        onClick={() => handleShowIndividuals(item)}
      >
        Meet {getPackName(item.common_name)}
      </Button>
    );
  
    const button = screen.getByText((content, element) => {
      return content.includes('Meet');
    });
  
    // Assert
    expect(button).toHaveTextContent('the Pack');
  
    // ACT
    fireEvent.click(button);
  
    // ASSERT
    expect(handleShowIndividuals).toHaveBeenCalledWith(item);
  });
  
  