import { render, screen } from "@testing-library/react";
import CustomerCard from "../components/CustomerCard";

test("renders customer card", () => {
  render(
    <CustomerCard name="John" total={90}>
      <div>Child</div>
    </CustomerCard>
  );

 expect(screen.getByText("John")).toBeInTheDocument();
expect(screen.getByText("Total Points:")).toBeInTheDocument();
expect(screen.getByText("90")).toBeInTheDocument();
});