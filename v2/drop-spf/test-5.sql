-- Creating the Customer table
CREATE TABLE Customer (
    CustomerID SERIAL PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    ContactNumber VARCHAR(20),
    Email VARCHAR(100) UNIQUE NOT NULL
);

-- Creating the CustomerAddress table
CREATE TABLE CustomerAddress (
    AddressID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL,
    Address TEXT NOT NULL,
    IsPreferred BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE
);

-- Creating the Order table
CREATE TABLE "Order" (
    OrderID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL,
    AddressID INT NOT NULL,
    StoreID INT NOT NULL,
    OrderDate TIMESTAMP NOT NULL,
    PickupDate TIMESTAMP NOT NULL,
    DeliveryDate TIMESTAMP NOT NULL,
    Status VARCHAR(20) NOT NULL CHECK (Status IN ('received', 'in progress', 'completed')),
    TotalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE,
    FOREIGN KEY (AddressID) REFERENCES CustomerAddress(AddressID) ON DELETE CASCADE,
    FOREIGN KEY (StoreID) REFERENCES Store(StoreID) ON DELETE CASCADE
);

-- Creating the Item table
CREATE TABLE Item (
    ItemID SERIAL PRIMARY KEY,
    ItemType VARCHAR(50) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL
);

-- Creating the OrderItem table
CREATE TABLE OrderItem (
    OrderItemID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    ItemID INT NOT NULL,
    Quantity INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ItemID) REFERENCES Item(ItemID) ON DELETE CASCADE
);

-- Creating the Employee table
CREATE TABLE Employee (
    EmployeeID SERIAL PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Position VARCHAR(50) NOT NULL CHECK (Position IN ('washer', 'delivery personnel'))
);

-- Creating the PickupDropoffLocation table
CREATE TABLE PickupDropoffLocation (
    LocationID SERIAL PRIMARY KEY,
    LocationName VARCHAR(100) NOT NULL,
    Address TEXT NOT NULL,
    ContactNumber VARCHAR(20)
);

-- Creating the Payment table
CREATE TABLE Payment (
    PaymentID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate TIMESTAMP NOT NULL,
    PaymentMethod VARCHAR(50) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE
);

-- Creating the Laundry table
CREATE TABLE Laundry (
    LaundryID SERIAL PRIMARY KEY,
    LaundryName VARCHAR(100) NOT NULL,
    ContactNumber VARCHAR(20),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Address TEXT
);

-- Creating the Store table
CREATE TABLE Store (
    StoreID SERIAL PRIMARY KEY,
    LaundryID INT NOT NULL,
    StoreName VARCHAR(100) NOT NULL,
    Address TEXT NOT NULL,
    ContactNumber VARCHAR(20),
    FOREIGN KEY (LaundryID) REFERENCES Laundry(LaundryID) ON DELETE CASCADE
);

-- Creating the Service table
CREATE TABLE "Service" (
    ServiceID SERIAL PRIMARY KEY,
    ServiceName VARCHAR(50) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL
);

-- Creating the LaundryService table
CREATE TABLE LaundryService (
    LaundryServiceID SERIAL PRIMARY KEY,
    LaundryID INT NOT NULL,
    ServiceID INT NOT NULL,
    FOREIGN KEY (LaundryID) REFERENCES Laundry(LaundryID) ON DELETE CASCADE,
    FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID) ON DELETE CASCADE
);

-- Creating the OrderService table
CREATE TABLE OrderService (
    OrderServiceID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    ServiceID INT NOT NULL,
    Quantity INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID) ON DELETE CASCADE
);

-- Creating the Review table
CREATE TABLE Review (
    ReviewID SERIAL PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderID INT NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment TEXT,
    ReviewDate TIMESTAMP NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE,
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE
);

-- Creating the Invoice table
CREATE TABLE Invoice (
    InvoiceID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    InvoiceDate TIMESTAMP NOT NULL,
    DueDate TIMESTAMP NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Status VARCHAR(20) NOT NULL CHECK (Status IN ('pending', 'paid', 'overdue')),
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE
);

-- Creating the EmployeeTask table
CREATE TABLE EmployeeTask (
    EmployeeTaskID SERIAL PRIMARY KEY,
    EmployeeID INT NOT NULL,
    OrderID INT NOT NULL,
    TaskDescription TEXT NOT NULL,
    TaskDate TIMESTAMP NOT NULL,
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID) ON DELETE CASCADE,
    FOREIGN KEY (OrderID) REFERENCES "Order"(OrderID) ON DELETE CASCADE
);
