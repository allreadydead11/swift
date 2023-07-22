import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import Signup from ".";
import createServer from "../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../constants/services";
import VerifyEmail from ".";

const renderComponent = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  render(
    // @ts-ignore
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <VerifyEmail />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const { handleCreateErrorConfig } = createServer([
  {
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.verifyEmail}`,
    res() {
      return {
        token: "1234567890",
      };
    },
  },
  {
    url: `${BASE_URL}${ENDPOINTS.currentUser}`,
    res() {
      return {
        data: {
          id: 1,
        },
      };
    },
  },
]);

test("Verifies email and redirects to login", async () => {
  const user = userEvent.setup();
  renderComponent();

  const codeInput = screen.getByPlaceholderText("Enter code");
  const submitButton = screen.getByRole("button", { name: /verify/i });
});
