package main

import "fmt"

type VanillaCakeFactoryInterface interface {
	Bake() string
}

// be wrapped
type VanillaCakeFactory struct{}

func (b *VanillaCakeFactory) Bake() string {
	return "Vanilla Cake"
}

// decorator
type ChocolateCakeFactory struct {
	oven VanillaCakeFactoryInterface
}

func (c *ChocolateCakeFactory) Bake() string {
	return fmt.Sprintf("Chocolate(%v)", c.oven.Bake())
}

// decorator
type CreamCakeFactory struct {
	oven VanillaCakeFactoryInterface
}

func (c *CreamCakeFactory) Bake() string {
	return fmt.Sprintf("Cream(%v)", c.oven.Bake())
}

// more decorator, more toping

func main() {
	vanillaChocolateFactory := CreamCakeFactory{
		&ChocolateCakeFactory{
			&VanillaCakeFactory{},
		},
	}
	fmt.Println(vanillaChocolateFactory.Bake())
}
