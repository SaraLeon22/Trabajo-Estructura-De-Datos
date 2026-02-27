class ArrayList:
    def __init__(self, size=100, initial_elements=[]):
        self.capacity = size
        self.array = [None] * self.capacity
        self.count = 0

        for element in initial_elements:
            if self.count < self.capacity:
                self.array[self.count] = element
                self.count += 1
            else:
                print("Error: La lista inicial excede la capacidad total")
                break

    def __str__(self):
        return str(self.array[:self.count])

    def __len__(self):
        return self.count

    def isEmpty(self):
        return self.count == 0

    def __getitem__(self, index):
        if index < 0 or index >= self.count:
            raise IndexError("Error: the index dont exist")
        return self.array[index]

    def __iter__(self):
        return iter(self.array[:self.count])

    def __contains__(self, element):
        return element in self.array[:self.count]

    def append(self, element):
        if self.count >= self.capacity:
            raise OverflowError("Error: the collection is full")
        self.array[self.count] = element
        self.count += 1

    def insert(self, index, element):
        if index < 0 or index > self.count:
            raise IndexError("Error: non existing index in the collection")
        if self.count >= self.capacity:
            raise OverflowError("Error: the collection is full")

        for i in range(self.count, index, -1):
            self.array[i] = self.array[i-1]

        self.array[index] = element
        self.count += 1

    def remove(self, element):
        index_to_remove = -1
        for i in range(self.count):
            if self.array[i] == element:
                index_to_remove = i
                break

        if index_to_remove == -1:
            raise ValueError("Error: the element dont exist in the collection")

        for i in range(index_to_remove, self.count - 1):
            self.array[i] = self.array[i+1]

        self.count -= 1
        self.array[self.count] = None

    def pop(self, index):
        if index < 0 or index >= self.count:
            raise IndexError("Error: non existing index in the collection")

        removed_element = self.array[index]

        for i in range(index, self.count - 1):
            self.array[i] = self.array[i+1]

        self.count -= 1
        self.array[self.count] = None

        return removed_element

    def clear(self):
        self.count = 0
        for i in range(self.capacity):
            self.array[i] = None

if __name__ == "__main__":
    mi_equipo = ArrayList(size=5, initial_elements=["Tabibito", "Paimon", "Zhongli"])
    mi_equipo.append("Venti")
    mi_equipo.insert(2, "Hu Tao")
    print("Equipo final:", mi_equipo)

    mi_equipo.remove("Hu Tao")
    print("Equipo sin Hu Tao:", mi_equipo)

    eliminado = mi_equipo.pop(1)
    print(f"Eliminamos a {eliminado} por índice. Equipo actual:", mi_equipo)
