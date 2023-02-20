import React from 'react'
import { render, screen, waitFor } from "@testing-library/react"
import { Login } from "./Login"
import userEvent from "@testing-library/user-event"

beforeEach(() => {
  render(<Login />)
})

test('Should show error messages when clicking Login when form is empty', async () => {
  userEvent.click(screen.getByTestId('submit-button'))

  await waitFor(() => {
    const messages = screen.queryAllByText(/this fields cannot be empty/i);
    expect(messages.length).toBe(2);
  })
})
