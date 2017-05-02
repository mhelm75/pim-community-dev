<?php

namespace Pim\Component\Catalog\Validator;

use Pim\Component\Catalog\Model\ProductInterface;
use Pim\Component\Catalog\Model\ProductValueInterface;

/**
 * Contains the state of the unique value for a product, due to EAV model we cannot ensure it via constraints on
 * database, we use this state to deal with bulk update and validation
 *
 * @author    Nicolas Dupont <nicolas@akeneo.com>
 * @copyright 2015 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
class UniqueValuesSet
{
    /** @var array allows to keep the state */
    protected $uniqueValues;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->uniqueValues = [];
    }

    /**
     * Reset the set
     */
    public function reset()
    {
        $this->uniqueValues = [];
    }

    /**
     * Return true if value has been added, else if value already exists inside the set
     *
     * @param ProductValueInterface $productValue
     *
     * @return bool
     */
    public function addValue(ProductValueInterface $productValue)
    {
        $identifier = spl_object_hash($productValue);
        $data = $productValue->__toString();
        $attributeCode = $productValue->getAttribute()->getCode();

        if (isset($this->uniqueValues[$attributeCode][$data])) {
            $storedIdentifier = $this->uniqueValues[$attributeCode][$data];
            if ($storedIdentifier !== $identifier) {
                return false;
            }
        }

        if (!isset($this->uniqueValues[$attributeCode])) {
            $this->uniqueValues[$attributeCode] = [];
        }

        if (!isset($this->uniqueValues[$attributeCode][$data])) {
            $this->uniqueValues[$attributeCode][$data] = $identifier;
        }

        return true;
    }

    /**
     * @return array
     */
    public function getUniqueValues()
    {
        return $this->uniqueValues;
    }
}
