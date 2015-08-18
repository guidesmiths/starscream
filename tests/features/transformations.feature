Feature: Starscream Transformation

Scenario: Simple Transformation With Longhand Mapping

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": 1631403869
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------
    [
        {
            "reader": {
                "type": "jsonPointer",
                "path": "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10"
            },
            "transformer": {
                "type": "passThrough"
            },
            "writer": {
                "type": "jsonPointer",
                "path": "/Transfomers: Combiner Wars"
            }
        }
    ]
    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "Transfomers: Combiner Wars": 1631403869
    }
    ------------------------------------


Scenario: Simple Transformation With Shorthand Mapping

    When I transform the following json:
    ------------------------------------
    {
        "publishers": {
            "IDW Publishing": {
                "books": {
                    "Transformers: Combiner Wars": {
                        "isbn-10": 1631403869
                    }
                }
            }
        }
    }
    ------------------------------------


    Using the mapping:
    ------------------------------------

    {
        "/Transfomers: Combiner Wars": "/publishers/IDW Publishing/books/Transformers: Combiner Wars/isbn-10"
    }

    ------------------------------------


    Then I should get:
    ------------------------------------
    {
        "Transfomers: Combiner Wars": 1631403869
    }
    ------------------------------------
