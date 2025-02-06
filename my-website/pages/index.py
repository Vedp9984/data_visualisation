import csv
import random

# Define data mapping
data_mapping = {
    'Small': {'12+ years': 52, '10+ years': 21},
    'Small-Medium': {'10+ years': 4, '12+ years': 4},
    'Medium': {'10+ years': 32, '12+ years': 14, '10- years': 6},
    'Medium-Large': {'10+ years': 8},
    'Large': {'10+ years': 54, '12+ years': 9, '10- years': 16},
    'Extra Large': {'10- years': 3}
}

def generate_random_age(lifespan):
    # Extract the numeric part of the lifespan
    if '+' in lifespan:
        base_age = int(lifespan.split('+')[0])
        age = random.randint(base_age, base_age + 5)  # Generate a random age within a range
    elif '-' in lifespan:
        base_age = int(lifespan.split('-')[0])
        age = random.randint(base_age - 5, base_age)
    else:
        age = int(lifespan.split()[0])  # Default case if no '+' or '-'
    
    return age


# Generate CSV
filename = 'data3.csv'
with open(filename, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Size', 'Lifespan', 'Age'])
    
    for size, lifespans in data_mapping.items():
        for lifespan, count in lifespans.items():
            for _ in range(count):
                age = generate_random_age(lifespan)
                writer.writerow([size, age])

print(f"CSV file '{filename}' generated successfully.")